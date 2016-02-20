/* global BlazeLayout, FlowRouter */

/* Routes */
createFlowRoute('home', { path: '/' });

/* Helpers */

function renderMainLayoutWithContent (content) {
  return () => BlazeLayout.render('layout', content);
}

function createFlowRoute (routeName, options = {}, extraContent = {}) {
  let path = options.path || ('/' + routeName);
  let templateName = options.templateName || routeName;
  let renderLayoutWithContent = options.renderLayoutFunction || renderMainLayoutWithContent;
  let content = { content: templateName };
  _.extend(content, extraContent);

  FlowRouter.route(path, {
    name: routeName,
    action: renderLayoutWithContent(content)
  });
}
