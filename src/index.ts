import { Parser } from './parser';

const json = `{
    "obj": {
        "empty-obj": {},
        "arr": [
            [], null, 1.2, -123, {
                "abc": "cde"
            }
        ]
    },
    "hello": "world",
    "empty-arr": []
}`;

const parser = new Parser(json);
parser.parse();
