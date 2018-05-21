const instantsearch = require('instantsearch.js')

let searchInput = document.getElementById("search-input");
searchInput.onclick = () => {
  searchInput.classList.add("active")
}

searchInput.onmouseout = () =>{
  searchInput.classList.remove("active")
}

const hitTemplate = `
{{#_highlightResult.icon64}}
  <div class="app-hit-container">
    <img src="https://electronjs.org/node_modules/electron-apps/apps/{{_highlightResult.slug.value}}/{{_highlightResult.icon64.value}}">
    <div>
      <div class="hit-type" >{{{type}}}</div>
      <b style="font-size:14pt" >{{{_highlightResult.name.value}}}</b>
      <div style="font-size:11pt" >{{{_highlightResult.description.value}}}</div>
      <a href={{{website}}} ><span class="octicon octicon-link-external" /></a>
      <a href={{{repository}}} ><span class="octicon octicon-mark-github" /></a>
    </div>
  </div>
{{/_highlightResult.icon64}}

{{^_highlightResult.icon64}}
  <div className="other-hit-container">
    <div class="hit-type" >{{{type}}}</div>
    <div>
      <b><a href={{{url}}} style="text-decoration: none" >{{{_highlightResult.title.value}}}</a></b>
      <div style="font-size: 10pt">{{{_highlightResult.tldr.value}}}</div>
    </div>
    <a href={{{url}}}>More <span class="octicon octicon-chevron-right" /></a>
  </div>
{{/_highlightResult.icon64}}
`;

module.exports = () => {
  const search = instantsearch({
    appId: 'L9LD9GHGQJ',
    apiKey: '24e7e99910a15eb5d9d93531e5682370',
    indexName: 'electron-apis',
    routing: true
  })

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        empty: 'No results',
        item: hitTemplate
      },
      transformData: {
        item: data => {
          // useful for viewing template context:
          console.log('data', data)
          return data
        }
      }
    })
  )

  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-input',
      placeholder: 'Search Electron APIs'
    })
  )

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#refinement-list',
      attributeName: 'type',
      limit: 10,
      templates: {
        header: 'Types'
      }
    })
  )

  search.start()

  search.on('render', (...args) => {
    // console.log('algolia render', args)
  })

  search.on('error', (...args) => {
    console.log('algolia error', args)
  })
}
