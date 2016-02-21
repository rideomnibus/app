[![Stories in Ready](https://badge.waffle.io/ride-cbus/ride-cbus.png?label=ready&title=Ready)](https://waffle.io/ride-cbus/ride-cbus)
# Ride Cbus

The open GPS fleet tracking platform.

# settings.json

Create `settings.json` in project root (ignored by git)

`galaxy.meteor.com` property is only necessary for Galaxy deployment.

```
{
  "galaxy.meteor.com": {
    "env": {
      "ROOT_URL": "YOUR_URL_HERE",
      "MONGO_URL": "mongodb://YOUR_MONGO_USERNAME:YOUR_MONGO_PASSWORD@MONGO_URI/DATABASE_NAME?replicaSet=REPLICA_SET_ID",
      "MONGO_OPLOG_URL": "mongodb://YOUR_MONGO_USERNAME:YOUR_MONGO_PASSWORD@MONGO_URI/local?authSource=YOUR_DATABASE_NAME"
    }
  },
  "public": {
    "forbidClientAccountCreation": false
  }
}
```

# How to run

`meteor --settings settings.json`
