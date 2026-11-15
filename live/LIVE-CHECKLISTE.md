# Gatherwynd live: Checkliste
Update 15.11.2026 17:45 Berlin (Thomas 17:35/17:38): dreisprachig, ES Standard unter live/, DE unter live/de/, EN unter live/en/, Umschalter ES | DE | EN, hreflang (x-default = ES). Impressum in allen drei Sprachen vorerst ohne Angaben (leerer Abschnitt). EN/ES muttersprachlich prüfen lassen. Bildquellen: quellen.md.
Update 15.11.2026 ~17:40 Berlin (Thomas 17:11 via Leitung): live/ komplett fertig als GitHub-Pages-Vorschau unter /live/ (noindex). 10 Häuser wieder drin (Quellen: quellen-haeuser.md), Kontakt nur info@gatherwynd.com (WhatsApp/Instagram fehlen bis Freigabe), Impressum/Datenschutz ohne Platzhalter mit belegten Daten (Straße, PLZ, NIF fehlen noch). Für Go-live auf IONOS: noindex entfernen, canonical https://gatherwynd.com/ setzen, Impressum vervollständigen, Hosting-Absatz Datenschutz (IONOS, AVV) ergänzen.

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
