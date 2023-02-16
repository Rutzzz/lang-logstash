import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, continuedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

export const logstashLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        PluginSectionFoldable: continuedIndent({except: /^\s*\}/}),
        PluginFoldable: continuedIndent({except: /^\s*\}/})
      }),
      foldNodeProp.add({
        "PluginSectionFoldable PluginFoldable Hash Array": foldInside
      }),
      styleTags({
        PluginType: t.className,
        Bareword: t.name,
        String: t.string,
        Number: t.number,
        Comment: t.lineComment,
        SelectorElement: t.variableName,
        "[ ]": t.squareBracket,
        "{ }": t.brace,
        "( )": t.paren
      })
    ]
  }),
  languageData: {
    commentTokens: {line: "#"},
    closeBrackets: {brackets: ["[", "{", "(", '"', "'"]},
    indentOnInput: /^\s*[\}\]]$/
  }
})

export function logstash() {
  return new LanguageSupport(logstashLanguage)
}
