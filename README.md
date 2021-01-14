# WebTechPrj
Project for FH Campus 02 Graz course: "Web Technologien"

**Project:**
Motorcycle Gang

**Collaborators**:

Ivica Budimir _[Entity: Appointment]_ <br>
Henrik Funke _[Entity: Customer]_ <br>
Patrick Khair _[Entity: Motorcycle]_

---

## How to JSON-server

Install JSON-server: https://github.com/typicode/json-server

Sample db.json file:

```
{
  "employees": [
    {
      "id": 2,
      "first_name": "Steve",
      "last_name": "Palmer",
      "email": "steve@codingthesmartway.com"
    },
    {
      "id": 3,
      "first_name": "Ann",
      "last_name": "Smith",
      "email": "ann@codingthesmartway.com"
    },
    {
      "id": 1,
      "first_name": "Test",
      "last_name": "Eschweiler",
      "email": "sebastian@codingthesmartway.com"
    },
    {
      "id": 36,
      "first_name": "Testssd",
      "last_name": "Eschweiler",
      "email": "sebastian@codingthesmartway.com"
    }
  ]
}
```

REST-call for entity employees:
```
localhost:3000/employees/
```

For insert use "POST" with JSON in body like:
```
{
    "id": 5,
    "first_name": "Test",
    "last_name": "Eschweiler",
    "email": "sebastian@codingthesmartway.com"
}
```

For delete use the same call as a "DELETE" and append an id:
```
localhost:3000/employees/{id}
```

For select use the same and append an id if you only want one entry. If you want all entries, do not append an id.
