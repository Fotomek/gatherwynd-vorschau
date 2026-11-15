# Gatherwynd live: Checkliste (Branch live-vorbereitung-v4, NICHT mergen)
Vorbereitet 15.11.2026 Berlin. Grundlage: version-4, Freigabe Nils 15.11. 14:26, Thomas 15.11. 16:54.

## Geändert gegenüber version-4
- Vorschau-Band und noindex entfernt, canonical https://gatherwynd.com/
- Demo-Auswahl der 10 fremden Häuser entfernt, ersetzt durch kurzen Text „Die ersten Orte entstehen gerade.“ (Variante B mit Karten nur nach schriftlichem OK der Häuser)
- Formulare (sendeten nichts) ersetzt durch Kontakt-Knöpfe WhatsApp, Instagram, E-Mail
- X-Link ersetzt durch Instagram
- Fußzeile bereinigt, Links zu Versionen 1 bis 3 entfernt, Impressum und Datenschutz verlinkt
- Neu: impressum.html, datenschutz.html (Entwürfe mit Platzhaltern)

## Platzhalter (pruefen.sh muss leer sein)
{{WHATSAPP_NUMMER_OHNE_PLUS}} {{INSTAGRAM_HANDLE}} {{KONTAKT_EMAIL}} {{VOLLER_NAME_NILS}} {{STRASSE_HAUSNUMMER}} {{PLZ_ORT}} {{ANSCHRIFT}} {{TELEFON}} {{NIF}} {{NIF_IVA_ODER_ZEILE_LOESCHEN}} {{AVV_BEI_IONOS_ABSCHLIESSEN_UND_BESTAETIGEN}} {{SPEICHERDAUER_PRUEFEN}} {{DATUM}}

## Go-live (erst nach Thomas' OK)
1. Platzhalter füllen, pruefen.sh grün, Thomas prüft Desktop und Mobil (NIKI).
2. Inhalt von live/ (index.html, impressum.html, datenschutz.html, assets/) per SFTP ins IONOS-Webspace-Verzeichnis von gatherwynd.com hochladen. Alternative: Domain per CNAME/A auf GitHub Pages (DNS-Änderung, nur mit Thomas' OK).
3. SSL-Zertifikat für gatherwynd.com und www aktivieren, HTTPS erzwingen, www auf Hauptdomain weiterleiten.
4. Live prüfen: HTTPS, Impressum, Datenschutz, Kontaktknöpfe, Videos.
