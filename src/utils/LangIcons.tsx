import {
    TclIcon,
    ScalaIcon,
    JavaScriptIcon,
    TypeScriptIcon,
    LuaIcon,
    CssIcon,
    PythonIcon,
    BashIcon
} from '@/assets/Icons'
import { JSX } from 'react'

const langIcons: { [key: string]: JSX.Element } = {
    JavaScript: <JavaScriptIcon />,
    TypeScript: <TypeScriptIcon />,
    Lua: <LuaIcon />,
    CSS: <CssIcon />,
    Python: <PythonIcon />,
    Shell: <BashIcon />,
    Scala: <ScalaIcon />,
    Tcl: <TclIcon />,
    Unknown: <div></div>
}

export default langIcons
