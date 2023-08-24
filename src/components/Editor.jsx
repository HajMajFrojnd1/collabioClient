import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { tokyoNight, tokyoNightInit } from '@uiw/codemirror-theme-tokyo-night';

const Editor = ({fileName}) => {
  return (
    <div className="flex flex-col gap-y-4 flex-1 justify-stretch">
        <span></span>
        <CodeMirror
            className='h-full'
            value="console.log('hello world!');"
            height="100%"
            theme={tokyoNight}
            extensions={[javascript({ jsx: true })]}
            onChange={(value, viewUpdate) => {
                console.log('value:', value);
            }}
        />
    </div>
  )
}

export default Editor