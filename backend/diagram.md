::: mermaid
erDiagram
USER ||--o{ APPOINTMENT : "tiene"
TIMEBLOCK ||--o{ APPOINTMENT : "contiene"

    USER {
        Int id PK
        String name
        String email
        String password
        Role role
    }

    APPOINTMENT {
        Int id PK
        DateTime date
        Int userId FK
        Int timeBlockId FK
    }

    TIMEBLOCK {
        Int id PK
        DateTime startTime
        DateTime endTime
    }

:::
