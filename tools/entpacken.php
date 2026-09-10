<?php
/**
 * Entpackt das hochgeladene Archiv der Seite direkt auf dem Server.
 *
 * Hintergrund: Der FTP-Zugang von Hostinger verweigert nach wenigen
 * angelegten Ordnern den Dienst. Deshalb wird die Seite als ein einziges
 * Archiv übertragen und hier ausgepackt – ein Vorgang, viele Ordner.
 *
 * Die Datei trägt bei jeder Veröffentlichung ein frisches Kennwort, das die
 * Automatik beim Aufruf mitschickt, und löscht sich anschließend selbst.
 */

const KENNWORT = '__KENNWORT__';

header('Content-Type: text/plain; charset=utf-8');

if (!hash_equals(KENNWORT, $_GET['t'] ?? '')) {
    http_response_code(403);
    exit("Kennwort falsch\n");
}

$verzeichnis = __DIR__;
$archiv = $verzeichnis . '/seite.zip';

if (!is_file($archiv)) {
    http_response_code(500);
    exit("Archiv nicht gefunden\n");
}

if (!class_exists('ZipArchive')) {
    http_response_code(500);
    exit("ZipArchive steht auf diesem Server nicht zur Verfügung\n");
}

/** Alten Programmordner wegräumen, damit keine Reste zurückbleiben. */
function verzeichnisLoeschen(string $pfad): void
{
    if (!is_dir($pfad)) {
        return;
    }
    $eintraege = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($pfad, FilesystemIterator::SKIP_DOTS),
        RecursiveIteratorIterator::CHILD_FIRST
    );
    foreach ($eintraege as $eintrag) {
        $eintrag->isDir() ? @rmdir($eintrag->getPathname()) : @unlink($eintrag->getPathname());
    }
    @rmdir($pfad);
}

verzeichnisLoeschen($verzeichnis . '/_next');

$zip = new ZipArchive();
if ($zip->open($archiv) !== true) {
    http_response_code(500);
    exit("Archiv lässt sich nicht öffnen\n");
}

$anzahl = $zip->numFiles;
$erfolg = $zip->extractTo($verzeichnis);
$zip->close();

if (!$erfolg) {
    http_response_code(500);
    exit("Entpacken fehlgeschlagen\n");
}

@unlink($archiv);

echo "OK – {$anzahl} Einträge entpackt\n";

// Diese Datei hat ihren Zweck erfüllt und verschwindet wieder.
@unlink(__FILE__);
