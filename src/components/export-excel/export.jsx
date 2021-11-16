import { ModalForm } from '@ant-design/pro-form'
import { 
  Button, 
  message, 
} from 'antd'

import { createExportTask } from '@/services/export-excel/export-template'

const Export = ({type, change, conditions})=> {
  const downExcel = ()=> {
    let str;
    if (typeof conditions === 'function') {
      str = JSON.stringify(conditions())
    } else {
      str = JSON.stringify(conditions)
    }
    createExportTask({
      code: type,
      fileName: type + +new Date() + '.xlsx',
      // TODO:条件
      queryParamStr: str,
      // querydesc: ''
    }).then(res=> {
      if(res?.success) {
        message.success('导出任务创建成功')
        change(true)
      }
    })
  }

  return (
    <ModalForm 
      title={'导出规则'}
      trigger={
        <Button type="primary">导出</Button>
      }
      width={500}
      submitter={{
        searchConfig: {
          submitText: '创建导出任务',
          resetText: '取消'
        }
      }}
      modalProps={{
        destroyOnClose: true
      }}
      onFinish={async () => {
        await downExcel()
        return true
      }}
    >
      <ol>
        <li>1、数据中的图片、附件只能以链接的形式导出</li>
        <li>2、每个sheet表导出的数据不超过5万条。超过5万条将分成多个sheet表</li>
        <li>3、导出后保留30天，30天后将自动删除，请及时下载。</li>
      </ol>
    </ModalForm>
  )
}

export default Export
