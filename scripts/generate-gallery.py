import math, os

VB_W, VB_H = 260.0, 150.0
CX, CY = VB_W / 2, VB_H / 2

P = [(14, CY), (CX * 0.5, CY - 62), (CX * 1.5, CY - 62), (VB_W - 14, CY)]
B = [(14, CY), (CX * 0.5, CY + 44), (CX * 1.5, CY + 44), (VB_W - 14, CY)]


def mulberry32(seed):
    a = seed & 0xFFFFFFFF
    def rnd():
        nonlocal a
        a = (a + 0x6D2B79F5) & 0xFFFFFFFF
        t = a
        t = (t ^ (t >> 15)) * (1 | t) & 0xFFFFFFFF
        t = (t + ((t ^ (t >> 7)) * (61 | t) & 0xFFFFFFFF)) & 0xFFFFFFFF ^ t
        return ((t ^ (t >> 14)) & 0xFFFFFFFF) / 4294967296
    return rnd


def cubic(pts, u):
    v = 1 - u
    x = v**3 * pts[0][0] + 3 * v * v * u * pts[1][0] + 3 * v * u * u * pts[2][0] + u**3 * pts[3][0]
    y = v**3 * pts[0][1] + 3 * v * v * u * pts[1][1] + 3 * v * u * u * pts[2][1] + u**3 * pts[3][1]
    return x, y


def tangent(pts, u):
    v = 1 - u
    x = 3 * v * v * (pts[1][0] - pts[0][0]) + 6 * v * u * (pts[2][0] - pts[1][0]) + 3 * u * u * (pts[3][0] - pts[2][0])
    y = 3 * v * v * (pts[1][1] - pts[0][1]) + 6 * v * u * (pts[2][1] - pts[1][1]) + 3 * u * u * (pts[3][1] - pts[2][1])
    n = math.hypot(x, y) or 1
    return x / n, y / n


def rot(p, a):
    c, s = math.cos(a), math.sin(a)
    return p[0] * c - p[1] * s, p[0] * s + p[1] * c


def upper_lashes(seed, count, max_len, width_scale=1.0, len_scale=1.0, grad="lash"):
    rnd = mulberry32(seed)
    out = []
    for i in range(count):
        u = 0.035 + 0.93 * (i + 0.5) / count
        rx, ry = cubic(P, u)
        tx, ty = tangent(P, u)
        nrm = (ty, -tx)
        d = rot(nrm, (u - 0.42) * 0.85)
        bell = math.sin(math.pi * min(max(u, 0.05), 0.95))
        ln = max_len * len_scale * (0.44 + 0.56 * bell) * (0.8 + 0.36 * u) * (0.9 + rnd() * 0.2)
        tip = (rx + d[0] * ln, ry + d[1] * ln)
        curl = rot(d, (0.34 + rnd() * 0.18) * (-1 if u < 0.5 else 1))
        c1 = (rx + d[0] * ln * 0.42, ry + d[1] * ln * 0.42)
        c2 = (tip[0] - curl[0] * ln * 0.34, tip[1] - curl[1] * ln * 0.34)
        w = (0.95 + rnd() * 1.0) * width_scale
        o = 0.7 + rnd() * 0.3
        out.append(
            f'<path d="M{rx:.2f} {ry:.2f} C{c1[0]:.2f} {c1[1]:.2f} {c2[0]:.2f} {c2[1]:.2f} {tip[0]:.2f} {tip[1]:.2f}" '
            f'stroke="url(#{grad})" stroke-width="{w:.2f}" opacity="{o:.2f}"/>'
        )
    return "\n      ".join(out)


def lower_lashes(seed, count, grad="lash"):
    rnd = mulberry32(seed)
    out = []
    for i in range(count):
        u = 0.1 + 0.8 * (i + 0.5) / count
        x, y = cubic(B, u)
        ln = (6 + math.sin(math.pi * u) * 7) * (0.8 + rnd() * 0.4)
        a = math.radians(78 + (u - 0.5) * 74)
        ex, ey = x + math.cos(a) * ln, y + math.sin(a) * ln
        out.append(
            f'<path d="M{x:.2f} {y:.2f} Q{x + (ex - x) * 0.45:.2f} {y + (ey - y) * 0.75:.2f} {ex:.2f} {ey:.2f}" '
            f'stroke="url(#{grad})" stroke-width="{0.65 + rnd() * 0.45:.2f}" opacity="{0.35 + rnd() * 0.3:.2f}"/>'
        )
    return "\n      ".join(out)


LID_TOP = f"M{P[0][0]} {P[0][1]} C{P[1][0]} {P[1][1]} {P[2][0]} {P[2][1]} {P[3][0]} {P[3][1]}"
LID_BOT = f"C{B[2][0]} {B[2][1]} {B[1][0]} {B[1][1]} {B[0][0]} {B[0][1]} Z"
SHAPE = f"{LID_TOP} {LID_BOT}"


def eye(uid, count, max_len, under_count, under_len, width_scale, seed, gaze=0.0):
    """Ein Auge in lokalen Koordinaten 260x150."""
    ix = gaze * 12
    under = (
        upper_lashes(seed + 421, under_count, max_len, width_scale * 0.72, under_len)
        if under_count
        else ""
    )
    return f'''
    <g>
      <ellipse cx="{CX}" cy="{CY - 6}" rx="{CX * 0.98:.1f}" ry="{CY * 1.15:.1f}" fill="url(#socket)"/>
      <g stroke="url(#lash)" fill="none" stroke-linecap="round">
      {lower_lashes(seed + 99, 18)}
      </g>
      <g clip-path="url(#clip-{uid})">
        <path d="{SHAPE}" fill="url(#sclera)"/>
        <g transform="translate({ix:.1f} 0)">
          <circle cx="{CX}" cy="{CY - 2}" r="31" fill="url(#iris)"/>
          <circle cx="{CX}" cy="{CY - 2}" r="31" fill="none" stroke="#1b0f33" stroke-width="3.4" opacity="0.75"/>
          <circle cx="{CX}" cy="{CY - 2}" r="12.5" fill="#050409"/>
          <circle cx="{CX - 5}" cy="{CY - 9}" r="5" fill="#ffffff" opacity="0.9"/>
          <circle cx="{CX + 7}" cy="{CY + 5}" r="2.4" fill="#ffffff" opacity="0.45"/>
        </g>
        <ellipse cx="{CX}" cy="{CY - 20}" rx="54" ry="12" fill="#ffffff" opacity="0.14" filter="url(#soft)"/>
        <path d="{LID_TOP}" fill="none" stroke="#1a1424" stroke-width="12" opacity="0.4"/>
      </g>
      <path d="{LID_TOP}" fill="none" stroke="#0a0810" stroke-width="4.6" stroke-linecap="round"/>
      <g stroke="url(#lash)" fill="none" stroke-linecap="round">
      {under}
      {upper_lashes(seed, count, max_len, width_scale)}
      </g>
    </g>'''


DEFS = '''
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#151020"/>
      <stop offset="55%" stop-color="#0d0c12"/>
      <stop offset="100%" stop-color="#191128"/>
    </linearGradient>
    <radialGradient id="sclera" cx="50%" cy="42%">
      <stop offset="0%" stop-color="#fbf9ff"/>
      <stop offset="58%" stop-color="#e7e1f2"/>
      <stop offset="100%" stop-color="#aea4c2"/>
    </radialGradient>
    <radialGradient id="iris" cx="42%" cy="36%">
      <stop offset="0%" stop-color="#d8c8ff"/>
      <stop offset="34%" stop-color="#a983f7"/>
      <stop offset="72%" stop-color="#6b3ac0"/>
      <stop offset="100%" stop-color="#2a1650"/>
    </radialGradient>
    <linearGradient id="lash" x1="0" y1="1" x2="0.25" y2="0">
      <stop offset="0%" stop-color="#050409"/>
      <stop offset="62%" stop-color="#1c1428"/>
      <stop offset="100%" stop-color="#a983f7"/>
    </linearGradient>
    <radialGradient id="socket" cx="50%" cy="45%">
      <stop offset="0%" stop-color="#c0a7ff" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#c0a7ff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="divider" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#9061e8" stop-opacity="0"/>
      <stop offset="50%" stop-color="#c0a7ff" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#9061e8" stop-opacity="0"/>
    </linearGradient>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="6"/>
    </filter>
    <clipPath id="clip-a"><path d="''' + SHAPE + '''"/></clipPath>
    <clipPath id="clip-b"><path d="''' + SHAPE + '''"/></clipPath>
  </defs>'''

FONT = 'font-family="Jost, Helvetica, Arial, sans-serif"'

STYLES = [
    ("lashes-01", "Classic Lashes", 24, 30, 0, 0, 0.9, 101, "tall"),
    ("lashes-02", "Hybrid Lashes", 26, 34, 14, 0.5, 0.95, 211, "short"),
    ("lashes-03", "Volume Lashes", 32, 40, 24, 0.55, 1.0, 307, "short"),
    ("lashes-04", "Mega Volume", 38, 48, 34, 0.62, 1.15, 419, "tall"),
    ("lashes-05", "Wet Look", 24, 46, 20, 0.5, 1.35, 523, "short"),
    ("lashes-06", "Lash Lifting", 24, 32, 0, 0, 0.85, 641, "tall"),
]


def build(name, title, count, max_len, under_count, under_len, width_scale, seed, span):
    tall = span == "tall"
    W, H = (1000, 1250) if tall else (1200, 900)
    # Vorher: schlichter, kurzer Naturwimpernkranz
    before = eye("a", 12, 11, 0, 0, 0.6, seed + 3, gaze=-0.2)
    after = eye("b", count, max_len, under_count, under_len, width_scale, seed, gaze=-0.2)

    if tall:
        s = 3.0
        ax, ay = (W - VB_W * s) / 2, 190
        bx, by = (W - VB_W * s) / 2, 760
        divider = f'<line x1="{W*0.18:.0f}" y1="{H*0.48:.0f}" x2="{W*0.82:.0f}" y2="{H*0.48:.0f}" stroke="url(#divider)" stroke-width="2"/>'
        labels = f'''
    <text x="{W/2:.0f}" y="{H*0.11:.0f}" text-anchor="middle" {FONT} font-size="26" letter-spacing="9" fill="#ece9f3" opacity="0.55">VORHER</text>
    <text x="{W/2:.0f}" y="{H*0.57:.0f}" text-anchor="middle" {FONT} font-size="26" letter-spacing="9" fill="#c0a7ff">NACHHER</text>'''
    else:
        s = 2.0
        ax, ay = W * 0.25 - VB_W * s / 2, H * 0.40
        bx, by = W * 0.75 - VB_W * s / 2, H * 0.40
        divider = f'<line x1="{W/2:.0f}" y1="{H*0.14:.0f}" x2="{W/2:.0f}" y2="{H*0.86:.0f}" stroke="url(#divider)" stroke-width="2"/>'
        labels = f'''
    <text x="{W*0.25:.0f}" y="{H*0.16:.0f}" text-anchor="middle" {FONT} font-size="26" letter-spacing="9" fill="#ece9f3" opacity="0.55">VORHER</text>
    <text x="{W*0.75:.0f}" y="{H*0.16:.0f}" text-anchor="middle" {FONT} font-size="26" letter-spacing="9" fill="#c0a7ff">NACHHER</text>'''

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="Vorher und Nachher: {title}">{DEFS}
  <rect width="{W}" height="{H}" fill="url(#bg)"/>
  <circle cx="{W*0.8:.0f}" cy="{H*0.16:.0f}" r="{W*0.3:.0f}" fill="#7844cf" opacity="0.12"/>
  <circle cx="{W*0.15:.0f}" cy="{H*0.88:.0f}" r="{W*0.26:.0f}" fill="#5f33a6" opacity="0.10"/>
  {divider}
  <g transform="translate({ax:.1f} {ay:.1f}) scale({s})">{before}</g>
  <g transform="translate({bx:.1f} {by:.1f}) scale({s})">{after}</g>
  {labels}
</svg>
'''


os.makedirs("public/gallery", exist_ok=True)
for cfg in STYLES:
    name = cfg[0]
    open(f"public/gallery/{name}.svg", "w").write(build(*cfg))
print("ok")
