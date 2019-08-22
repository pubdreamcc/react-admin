// 富文本编辑器组件
import React, { Component } from 'react'
import propTypes from 'prop-types'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class RichTextEditor extends Component {
  static propTypes = {
    detail: propTypes.string
  }
  
  constructor (props) {
    super(props)
    const html = props.detail
    if (html) {
      // 如果商品详情有内容，则显示之前商品详情内容
      const contentBlock = htmlToDraft(html)
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
        const editorState = EditorState.createWithContent(contentState)
        this.state = { editorState }
      }
    } else {
      // 商品无详情
      this.state = {editorState: EditorState.createEmpty()}
    }
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
