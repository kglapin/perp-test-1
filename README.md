# MILIMETR — pracownia glazurnicza

Koncepcyjna, storytellingowa strona firmy glazurniczej zbudowana jako szybki statyczny serwis dla GitHub Pages.

## Technologia

- semantyczny HTML5,
- autorski CSS bez frameworka UI,
- GSAP + ScrollTrigger ładowane z CDN,
- progressive enhancement: treść pozostaje dostępna bez JavaScriptu,
- osobne zachowanie ruchu na desktopie i mobile,
- obsługa `prefers-reduced-motion`.

## Przed publikacją

Należy zastąpić:

1. roboczą nazwę `MILIMETR`,
2. numer telefonu i adres e-mail,
3. obszar działania,
4. stockowe zdjęcia prawdziwymi realizacjami,
5. demonstracyjną opinię prawdziwą rekomendacją,
6. formularz demonstracyjny docelowym endpointem,
7. metadane Open Graph i politykę prywatności.

## Lokalne uruchomienie

Projekt nie wymaga procesu budowania:

```bash
python3 -m http.server 8080
```

Następnie otwórz `http://localhost:8080`.
