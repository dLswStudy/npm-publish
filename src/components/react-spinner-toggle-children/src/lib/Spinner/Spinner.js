import {Spin} from "antd";
import {useRef} from "react";

const Spinner = ({loading, topOffset_px = 0, isError, errMsgEl, children, customSpinner}) => {
    // timelog('Spin--')
    const chdr = useRef(null) //children
    const isRenderChdr = !loading && !isError //whether rendering children or not
    const chdrW = useRef(0)
    const chdrH = useRef(topOffset_px * 2)

    /*
    children 이 렌더링이 되어 있었을 때의 width와 height 를
    이 컴포넌트의 width와 height 로 설정하기 */
    if(chdr?.current){
        const w = chdr.current.offsetWidth
        const h = chdr.current.offsetHeight
        if(w > 0) chdrW.current = w
        if(h > topOffset_px * 2) chdrH.current = h
    }
    const thisCompW = `${chdrW.current}px`
    const thisCompH = `${chdrH.current}px`

    return (
        <div className="SpinByW" style={{position: 'relative', minHeight: thisCompH, minWidth: thisCompW}}>
            {
                loading &&
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}>
                    {
                        customSpinner
                        ??
                        <Spin spinning={loading}></Spin>
                    }
                </div>
            }
            <div ref={chdr}>
                {isRenderChdr && children}
            </div>
            {isError &&
                <div className="errMsgBox" style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}>
                    {errMsgEl}
                </div>
            }
        </div>
    );
};

export default Spinner;