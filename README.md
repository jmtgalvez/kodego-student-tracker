# KodeGo Student Tracker

#### A Student Enrollment Tracking System

### Download

1. Check if you already have github installed
```
git --version
```

2. If not, follow the steps for installation
```
https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
```

3. Configure your Github credentials
```
git config user.email "your@email.com"
git config user.name "Your Name"
```

4. Clone the repository
```
git clone https://github.com/jmtgalvez/kodego-student-tracker
```

### Setup

1. Create the database using the schema.sql file in
```
./routes/database/schema.sql
```

2. Install the dependencies
```
npm install
```

3. Run the server using nodemon
```
npx nodemon
```