import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import '../css/bootstrap.css'

export default function CK_Editor(props) {
  const editorConfiguration = {
    toolbar: {
      items: [
        'undo', 'redo',
        '|','highlight',
        '|', 'heading',
        '|',{
          label: 'fonts',
          icon:false,
          items: ['fontfamily','fontsize', 'fontColor', 'fontBackgroundColor'] 
      },
        '|', 'bold', 'italic',
        '|', 'link','uploadImage','imageInsert', 'blockQuote','alignment',
        '|', 'bulletedList', 'numberedList',
        '|', 'outdent', 'indent','FindAndReplace'
    ],
    shouldNotGroupWhenFull: false
    }
};

if (props.data ==null || props.data == undefined){
  return <></>
}
  return (
    <div className='ck_editor'>
          <CKEditor
          editor={Editor}
          config={editorConfiguration}
          data={props.data}
          onReady={ editor => {
            // You can store the "editor" and use when it is needed.
            console.log( 'Editor1 is ready to use!' );
        } }
          onChange={ ( event, editor ) => {
            const data = editor.getData()
            if(data !==null||data!==undefined){
              props.setdata(prevState =>({...prevState,content:data}))
            }
          } }
        />
    </div>
  )
}
