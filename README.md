# Predictive Recursive Descent Parser for JSON

## Grammar

| Terminal | Expression |
| --- | --- |
| cro | `\{` |
| crc | `\}` |
| cma | `\,` |
| cln | `\:` |
| sqo | `\[` |
| sqc | `\]` |
| qts | `\"[^\"\\]*(?:\\.[^\"\\]*)*\"` |
| num | `(\-\|)([1-9][0-9]*\|0)((\.[0-9]*[1-9])\|)` |
| nul | `null` |
| eof | `$` |

```
JSON -> OBJECT | ARRAY
OBJECT -> cro ITEMS crc
ITEMS -> ITEM ITEMS-PRIME | e
ITEM -> KEY cln VALUE
ITEMS-PRIME -> cma ITEM ITEMS-PRIME | e
ARRAY -> sqo VALUES sqc
VALUES -> VALUE VALUES-PRIME | e
VALUE -> OBJECT | ARRAY | qts | num | nul
VALUES-PRIME -> cma VALUE VALUES-PRIME | e
KEY -> qts
```

## FIRST Sets

| FIRST | SET |
| --- | --- |
| JSON | cro, sqo |
| OBJECT | cro |
| ITEMS | e, qts |
| ITEM | qts |
| ITEMS-PRIME | cma, e |
| ARRAY | sqo |
| VALUES | e, cro, sqo, qts, num, nul |
| VALUE | cro, sqo, qts, num, nul |
| VALUES-PRIME | cma, e |
| KEY | qts |

## FOLLOW Sets

| FOLLOW | SET |
| --- | --- |
| JSON | $ |
| OBJECT | $, cma, crc, sqc |
| ITEMS | crc |
| ITEM | cma, crc |
| ITEMS-PRIME | crc |
| ARRAY | $, cma, crc, sqc |
| VALUES | sqc |
| VALUE | cma, crc, sqc |
| VALUES-PRIME | sqc |
| KEY | cln |