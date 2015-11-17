# Your init script
#
# Atom will evaluate this file each time a new window is opened. It is run
# after packages are loaded/activated and after the previous editor state
# has been restored.
#
# An example hack to make opened Markdown files always be soft wrapped:
#
# path = require 'path'
#
# atom.workspaceView.eachEditorView (editorView) ->
#   editor = editorView.getEditor()
#   if path.extname(editor.getPath()) is '.md'
#     editor.setSoftWrap(true)
fs = require('fs')

# Import ENV from zsh config.
fs.readFile process.env.HOME+"/.zshrc", "utf8", (err, zshFile) ->
  envPaths = []
  oldPath = process.env.PATH
  for l in zshFile.split('\n')
    if l.substring(0,11) is 'export PATH'
      e = l.split('=').splice(-1)[0]
      e = e.replace(':$PATH','').replace(/"/g,'')
      if ':' in e
        for x in e.split(':')
          envPaths.push(x)
      else
        envPaths.push(e)
    newPaths = envPaths.join(':').concat ':'
  process.env.PATH = newPaths.concat oldPath
