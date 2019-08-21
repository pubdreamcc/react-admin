// 富文本编辑器组件
import React, { Component } from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
// import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class RichTextEditor extends Component {
  state = {
    // 创建一个空的编辑对象
    editorState: EditorState.createEmpty()
  }
  /*
    编辑器内容改变的回调
  */
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
  }

  getDetail = () => {
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }

  render() {
    const { editorState } = this.state
    return (
      <Editor
        editorState={editorState}
        onEditorStateChange={this.onEditorStateChange}
        editorStyle={{minHeight: 200, border: '1px solid black', paddingLeft: 10}}
      />
    )
  }
}
