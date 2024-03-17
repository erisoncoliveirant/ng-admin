export function getQueryParam(prop: any) {
  var params: any = {};
  var search = decodeURIComponent(
    window.location.href.slice(window.location.href.indexOf('?') + 1)
  );
  var definitions = search.split('&');
  definitions.forEach(function (item) {
    var [key, value] = item.split('=', 2);
    params[key] = value;
  });
  return prop && prop in params ? params[prop] : params;
}
