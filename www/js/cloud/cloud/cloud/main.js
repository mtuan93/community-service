
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("modifyUser", function(request, response) {
    Parse.Cloud.useMasterKey();
    var query = new Parse.Query(Parse.User);
    query.equalTo("email", request.params.email);
    query.first({
        success: function(anotherUser) {
            anotherUser.set('points', request.params.points);
            anotherUser.save(null, {
                success: function(status) {
                    // The user was saved successfully.
                    response.success("Successfully updated user.");
                },
                error: function(status) {
                    // The save failed.
                    // error is a Parse.Error with an error code and description.
                    response.error("Could not save changes to user.");
                }
            });
        },
        error: function(error) {
            response.error("Could not find user.");
        }
    });
});
