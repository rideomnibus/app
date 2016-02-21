Template.menuFollowing.helpers({
  accountCreationEnabled () {
    return !Meteor.settings.public.forbidClientAccountCreation;
  }
});
