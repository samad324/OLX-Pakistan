



self.addEventListener('push', function (event) {
    console.log('Received a push message', event);
  
    var notification = event.data.json().notification
    console.log(notification)
    var title = notification.title || 'Yay a message.';
    var body = notification.body || 'We have received a push message.';
    var icon = notification.icon
    // var tag = 'simple-push-demo-notification-tag';
  
    event.waitUntil(
      self.registration.showNotification(title, {
        body: body,
        icon : icon,
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        // tag: tag
      })
    );
  
  });




  // on Notification Click do whatever you want...
  self.addEventListener('notificationclick', function(event) {
    var notification = event.notification;
    var action = event.action;
  
    console.log(notification);
  
    if (action === 'confirm') {
      console.log('Confirm was chosen');
      notification.close();
    } else {
      console.log(action);
      event.waitUntil(
        clients.matchAll()
          .then(function(clis) {
            var client = clis.find(function(c) {
              return c.visibilityState === 'visible';
            });
  
            if (client !== undefined) {
              client.navigate(notification.data.url);
              client.focus();
            } else {
              clients.openWindow(notification.data.url);
            }
            notification.close();
          })
      );
    }
  });