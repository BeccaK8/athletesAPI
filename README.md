# Athletes App API

## Backend server for the athletes app with auth and mongoose relationships

## Entities

```js
User is comprised of the following: 

    email: {
        type: String,
        required: true,
        unique: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    token: String
```

```js
Athlete is comprised of the following: 

    name: {
        type: String,
        required: true,
    },
    sport: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    }
    currentTeam: {
        type: String,
        required: true,
    }
    jerseyNumber: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
```


## Routes

### Authentication Routes

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/` | `users#changepw`  |
| DELETE | `/sign-out/`        | `users#signout`   |


### Athlete Routes

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET   | `/athletes`             | `athletes#index`    |
| GET   | `/athletes/:id`             | `athletes#show`    |
| POST   | `/athletes`             | `athletes#create`    |
| PATCH  | `/athletes/:id` | `athletes#update`  |
| DELETE | `/athletes/:id`        | `athletes#delete`   |

