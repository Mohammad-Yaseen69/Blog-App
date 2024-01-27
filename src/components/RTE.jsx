import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { forwardRef } from 'react'
import { Controller } from 'react-hook-form'


const RTE = ({ name, lable, control, defaultValue = "" }, ref) => {
    return (
        <div>
            {lable && <label className='block text-sm font-medium' htmlFor={name}>{lable}</label>}
            <div className='focus:ring-2 focus:ring-blue-600'>
                <Controller
                    name={name}
                    control={control}
                    defaultValue={defaultValue}
                    render={({ field: { onChange, value } }) => (
                        <Editor
                            initialValue='default value'
                            init={{
                                branding: false,
                                height: 500,
                                // width: '200px',
                                id: name,
                                menubar: true,
                                plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'],

                                toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | ' +
                                    'bullist numlist outdent indent | removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px '
                            }}
                            onEditorChange={onChange}
                        />
                    )}
                />
            </div>
        </div>
    )
}

export default forwardRef(RTE)