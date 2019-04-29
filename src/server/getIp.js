const IpUtils = {
  getIPs
}

export default IpUtils

// get the IP addresses associated with an account
function getIPs (callback) {
  var ipDups = {}
  var RTCPeerConnection = window.RTCPeerConnection ||
      window.mozRTCPeerConnection ||
      window.webkitRTCPeerConnection
  if (!RTCPeerConnection) {
    var iframe = document.createElement('iframe')
    var win = iframe.contentWindow
    RTCPeerConnection = win.RTCPeerConnection ||
          win.mozRTCPeerConnection ||
          win.webkitRTCPeerConnection
  }
  var mediaConstraints = {
    optional: [{RtpDataChannels: true}]
  }
  var servers = {iceServers: [{urls: 'stun:stun.services.mozilla.com'}]}
  var pc = new RTCPeerConnection(servers, mediaConstraints)
  function handleCandidate (candidate) {
    var ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
    if (ipRegex.exec(candidate)) {
      var ipAddr = ipRegex.exec(candidate)[1]
      if (ipDups[ipAddr] === undefined) {
        callback(ipAddr)
      }
      ipDups[ipAddr] = true
    }
  }
  pc.onicecandidate = function (ice) {
    if (ice.candidate) { handleCandidate(ice.candidate.candidate) }
  }
  pc.createDataChannel('')
  pc.createOffer(function (result) {
    pc.setLocalDescription(result, function () {}, function () {})
  }, function () {})
}
// insert IP addresses into the page
