import path from 'node:path'
import type { Plugin } from 'vite'

const node_modules_path = path.resolve(__dirname, 'node_modules')

const sourceVariableRegex =
  /(const|let|var)\s*(\w+)\s*=\s*["']["']\s*\/\*\s*code-source:\s*([a-zA-Z0-9\s]+)\s*\*\//g

const sectionStartRegex = /\/\/\s*#region ([a-zA-Z0-9_\s]+)/g
const sectionEndRegex = /\/\/\s*#endregion/g

export default function CodeSourcePlugin() {
  return {
    name: 'code-source-plugin',
    enforce: 'pre',

    transform(code, fileName) {
      // Check if id is subpath of node_modules_path
      if (path.resolve(fileName).startsWith(node_modules_path)) {
        return
      }

      // Does the file have a source variable?
      const sourceVariableMatch = code.match(sourceVariableRegex)
      if (!sourceVariableMatch) {
        return
      }

      const sections: Record<string, string> = {}
      const lines = code.split('\n')
      let sectionName = ''
      let currentSection = ''
      for (const line of lines) {
        const sectionMatchStart = sectionStartRegex.exec(line)
        if (sectionMatchStart != null) {
          sectionName = sectionMatchStart[1]
          currentSection = ''
          continue
        }

        const sectionMatchEnd = line.match(sectionEndRegex)

        if (sectionMatchEnd != null && currentSection.trim() !== '') {
          sections[sectionName.trim()] = currentSection
          currentSection = ''
          sectionName = ''
          continue
        }
        currentSection += line + '\n'
      }

      let finalCode = code

      for (const sourceLine of sourceVariableMatch) {
        // For some reason i need to instantiate a new regex object every time
        const [, variableType, variableName, codeSectionName] =
          /(const|let|var)\s*(\w+)\s*=\s*["']["']\s*\/\*\s*code-source:\s*([a-zA-Z0-9\s]+)\s*\*\//g.exec(
            sourceLine,
          ) ?? []

        if (variableName == null || codeSectionName == null) {
          continue
        }

        const sourceCode = sections[codeSectionName.trim()]
        if (sourceCode == null) {
          continue
        }
        finalCode = finalCode.replace(
          sourceLine,
          `${variableType} ${variableName} = "${sourceCode.trim().replaceAll('\n', '\\n').replaceAll('"', '\\"')}";`,
        )
      }
      return finalCode
    },
  } satisfies Plugin
}
