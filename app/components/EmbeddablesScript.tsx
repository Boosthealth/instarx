"use client";

import Script from "next/script";

export default function EmbeddablesScript() {
  return (
    <Script
      id="embeddables-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `window.initEmbeddables = () => {
  const engineDomain =
    new URL(window.location.href).searchParams.get('embeddables_engine_domain') ||
    'engine.embeddables.com'
  const urlRoot = engineDomain.startsWith('http://localhost') ? '' : engineDomain.startsWith('http') ? engineDomain : 'https://' + engineDomain

  const script = document.createElement('script')
  script.src = urlRoot + '/bundle.js'
  document.head.appendChild(script)

  const initializeEmbeddables = function () {
    const allUserData = JSON.parse(localStorage.getItem('SavvyFormUserData') || '{}')
    const embeddablesToLoad = [...document.querySelectorAll('savvy, embeddable')].map((el) => {
      const attrs = Object.fromEntries([...el.attributes].map((a) => [a.name, a.value]))
      const flowId = attrs.id
      if (flowId && allUserData[flowId]) {
        attrs.userData = Object.fromEntries(Object.entries(allUserData[flowId]||{}).filter(([sk])=>sk==='current_page_id'||sk.startsWith('split_')))
      }
      return attrs
    })
    const originUrl = window.location.href
    const url =
      urlRoot + '/init?load=' +
      encodeURIComponent(JSON.stringify({ embeddablesToLoad, originUrl }))

    fetch(url)
      .then((res) => res.json())
      .then((response) => eval('(' + response.init_js + ')(response.embeddables_data)'))
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEmbeddables)
  } else {
    initializeEmbeddables()
  }
}
window.initEmbeddables()`,
      }}
    />
  );
}
