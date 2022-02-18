import React from 'react';
import './virtulaList.css';

function VirtualList() {
  console.log('VirtualList render~');
  const [dataList, setDataList] = React.useState([])  /* 保存数据源 */
  const [section, setSection] = React.useState({ start: 0, end: 0 }) /* 渲染区间: 缓冲区+视图区 */
  const scroll = React.useRef(null)  /* 获取scroll元素 */
  const box = React.useRef(null)     /* 获取元素用于容器高度 */
  const context = React.useRef(null) /* 用于移动视图区域，形成滑动效果。 */
  const scrollInfo = React.useRef({
    height: 500,     /* 容器高度 */
    bufferCount: 8,  /* 缓冲区个数 */
    itemHeight: 60,  /* 每一个item高度 */
    renderCount: 0,  /* 渲染区个数 */
  })

  React.useEffect(() => {
    console.log('useEffect~');
    // 获取容器高度，设置 overflow:auto 提供滚动条；设置 position: relative; 将撑起滚动条的"大div"包裹其中
    const height = box.current.offsetHeight
    // 获取当前 item高度，缓冲区数量
    const { itemHeight, bufferCount } = scrollInfo.current
    // 计算视图区个数
    const renderCount = Math.ceil(height / itemHeight) + bufferCount
    // 缓存信息，(使用 useRef 不会造成组件重新渲染)
    scrollInfo.current = { height, bufferCount, itemHeight, renderCount }
    // 初始化大数据列表
    const dataList = new Array(10000).fill(1).map((item, index) => index + 1)
    // 放到 fiber  useState hook 里
    setDataList(dataList)
    // 初始化渲染 dataList 中的 第start个 到 第end-1个
    setSection({ start: 0, end: renderCount })
    // batchedUpdate 只触发一次 render
  }, [])

  const handleScroll = () => {
    // scroll_box 卷起来的内容顶部 到 可见内容顶部 的高度（向上滚了多少）
    const { scrollTop } = scroll.current
    // item高度、item数量
    const { itemHeight, renderCount } = scrollInfo.current
    // 完整地去掉了多少item的高度，只有完整地滚掉一个item，currentOffset才会加一个itemHeight，否则currentOffset不会变化
    const currentOffset = scrollTop - (scrollTop % itemHeight)
    // 卷起来的高度 / item高度 === 卷起来多少个item
    const start = Math.floor(scrollTop / itemHeight)
    // 替换渲染列表时，new_item_top 会停留在 old_item_top 的位置，也就是超出视图的上方位置，这是要解决的问题。
    // 解决方法: 
    //  transform: translate(0, X*itemHeight) 将 "new_item_top列表" 变换到 "old_item_top列表没有滚动时" 的位置 (伊邪那美)
    //  列表顶变成了 new_item_top后，看起来像 old_item_top 被 new_item_top 顶上去了一样，实际上 old_item_top 已经从 DOM 中消失了
    context.current.style.transform = `translate(0, ${currentOffset}px)`;
    // 卷掉的item数量 + 渲染的item数量 + 1 => 末尾渲染到哪个item
    const end = Math.floor(scrollTop / itemHeight + renderCount + 1)
    // logger
    console.log('start ', start, ' end ', end, ' scrollTop ', scrollTop, ` translate(0, ${currentOffset}px)`);
    // 渲染的列表首尾下标发生变化时，通知组件重新渲染，以更新DOM，替换渲染列表
    if (end !== section.end || start !== section.start) {
      setSection({ start, end })
    }
  }

  const { itemHeight, height } = scrollInfo.current
  const { start, end } = section
  const renderList = dataList.slice(start, end)  /* 真实DOM渲染的item [start, ..., end-1] */

  console.log('渲染区间', section)

  return (
    <div className="list_box" ref={box} >
      {/* list_box自适应高度 */}

      {/* height 有一个初始值 500px 的高度，useEffect 之后会得到 list_box 的高度 */}
      {/* 这个需要 overflow: auto，以展示滚动条 */}
      <div className="scroll_box" style={{ height: height + 'px' }} onScroll={handleScroll} ref={scroll}  >

        {/* 计算所有item加起来的高度，撑起滚动条 */}
        {/* 这个里面没有内容，纯用来撑高度 */}
        {/* 实际滚动的时候，滚的是 scroll_hold */}
        <div className="scroll_hold" style={{ height: `${dataList.length * itemHeight}px` }} />

        {/* 真实渲染的列表项，包括 缓冲区和渲染区 */}
        <div ref={context}>
          {
            renderList.map((item, index) => <div className="item" key={index} >  {item + ''} Item </div>)
          }
        </div>
      </div>
    </div>
  )
}

export default VirtualList;
