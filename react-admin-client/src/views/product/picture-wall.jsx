// 展示商品图片的组件
import React, { Component } from 'react'
import { Upload, Icon, Modal, message} from 'antd'
import propTypes from 'prop-types'
import { BASE_IMG_URL } from '../../utils/constance'
import { deleteProductImgIf } from '../../api/index'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
export default class PictureWall extends Component {
  static propTypes = {
    imgs: propTypes.array
  }
  constructor (props) {
    super(props)
    let fileList = []
    const { imgs } = this.props
    if (imgs && imgs.length > 0) {
      fileList = imgs.map((img, index) => ({
        uid: -index,      // 文件唯一标识
        name: img,   // 文件名
        status: 'done',  // 图片的状态：done：已上传，uploading：上传中，error：错误，removed：已删除
        url: BASE_IMG_URL + img
      }))
    }
    // 初始化状态
    this.state = {
      previewVisible: false, // 是否预览大图
      previewImage: '', // 大图的url地址
      fileList // 已经上传的图片文件对象数组
    }
  }

  /*
    获取所有已经上传的图片文件名数组
 */
  getImgs = () => {
    return this.state.fileList.map(file => file.name)
  }
  /*
    操作预览大图
  */
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    // 更新状态
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    })
  }
  /*
    隐藏Modal
  */
  handleCancel = () => {
    this.setState({previewVisible: false})
  }
  /*
    上传的文件对象改变的回调
  */
  handleChange = async ({file, fileList}) => {
    if (file.status === 'done') {
      const result = file.response
      if(result.status === 0) {
        message.success('上传图片成功！')
        const { name, url } = result.data
        // 将当前上传的file的信息修正
        file = fileList[fileList.length -1]
        file.name = name
        file.url = url
      } else {
        message.error('上传图片失败！')
      }
    } else if (file.status === 'removed') {
      const response = await deleteProductImgIf(file.name)
      if (response.status === 0) {
        message.success('删除图片成功！')
      } else {
        message.error('删除图片失败！')
      }
    }
    this.setState({ fileList })
  }
  render() {
    const { fileList, previewImage, previewVisible } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div>Upload</div>
      </div>
    )
    return (
      <div>
        <Upload
          fileList={fileList} // 所有已经上传的图片文件对象数组
          accept='image/*' // 只接受图片类型
          action='/manage/img/upload' // 图片的上传地址
          listType='picture-card'
          name='image' // 请求参数名
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} onCancel={this.handleCancel} footer={null}>
          <img src={previewImage} alt="example" style={{ width: '100%' }}/>
        </Modal>
      </div>
    )
  }
}

