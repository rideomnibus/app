/* global BlazeLayout, FlowRouter */

/* FlowRouter configuration */
let userAccountsRoutes = [
  'atSignIn',
  'atSignUp',
  'atVerifyEmail',
  'atSendAgain',
  'atChangePwd',
  'atEnrollAccount',
  'atForgotPwd',
  'atResetPassword'
];

/* Routes */
createFlowRoute('home', { path: '/' });
createFlowRoute('driver');
createFlowRoute('about');
createFlowRoute('scan');

FlowRouter.triggers.enter([ requireLoggedIn ], {
  except: _.union([ 'home', 'scan' ], userAccountsRoutes, ['about'] )
});

/* Helpers */
function requireLoggedIn (context, redirect) {
  if (!((Meteor.user() !== null) || Meteor.loggingIn())) {
    return redirect('atSignIn');
  }
}

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
