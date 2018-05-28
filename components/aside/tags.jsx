
export default (props)=>(props.tags.length > 0 && (
    <div className="aside-widget">
      <header>
        <h3>Tags</h3>
      </header>
      <div className="body clearfix">
        <ul className="tags">
          {props.tags.map(
            tag => <li key={tag.id}><a href={'/article'+tag.id}>{tag.name}</a></li>
          )}
        </ul>
      </div>
    </div>
  )
)
