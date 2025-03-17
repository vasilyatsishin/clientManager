import * as SQLite from "expo-sqlite";

export const clientTableCreating = async (db:SQLite.SQLiteDatabase) => {
  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Client (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          externalId INTEGER,
          id1c TEXT,
          addressId INTEGER,
          type INTEGER,
          productType INTEGER,
          name TEXT,
          code TEXT,
          phone TEXT,
          comment TEXT,
          isSent INTEGER,
          FOREIGN KEY (addressId) REFERENCES Address(id) ON DELETE CASCADE
        );
      `);
};

export const contractTableCreating = async (db:SQLite.SQLiteDatabase) => {
  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Contract (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          externalId INTEGER,
          clientId INTEGER,
          organizationId INTEGER,
          name TEXT,
          contractType TEXT CHECK(contractType IN ('CASH', 'BANK')),
          isPurina INTEGER CHECK(isPurina IN (0, 1)),
          hasPdfCopy INTEGER CHECK(hasPdfCopy IN (0, 1)),
          FOREIGN KEY (clientId) REFERENCES Client(id) ON DELETE CASCADE,
          FOREIGN KEY (organizationId) REFERENCES Organization(id) ON DELETE CASCADE
        );
    `);
};

export const storeTableCreating = async (db:SQLite.SQLiteDatabase) => {
  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Store (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          externalId INTEGER,
          "1cId" TEXT,
          typeId INTEGER,
          marketSegmentId INTEGER,
          distributionZoneId INTEGER,
          clientId INTEGER,
          addressId INTEGER,
          scheduleId INTEGER,
          signboard TEXT,
          phone TEXT,
          daysOfVisit TEXT,
          comment TEXT,
          sendStatus INTEGER CHECK(sendStatus IN (0, 1)),
          FOREIGN KEY (clientId) REFERENCES Client(id) ON DELETE CASCADE,
          FOREIGN KEY (addressId) REFERENCES Address(id) ON DELETE CASCADE,
          FOREIGN KEY (scheduleId) REFERENCES Schedule(id) ON DELETE CASCADE
        );
      `);
};

export const documentTableCreating = async (db:SQLite.SQLiteDatabase) => {
  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Document (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          clientId INTEGER,
          imagePath TEXT,
          predictionClass INTEGER,
          predictionName TEXT,
          sendStatus INTEGER CHECK(sendStatus IN (0, 1)),
          FOREIGN KEY (clientId) REFERENCES Client(id) ON DELETE CASCADE
        );
      `);
};

export const addressTableCreating = async (db:SQLite.SQLiteDatabase) => {
  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Address (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          type TEXT,
          country TEXT,
          regionId TEXT,
          districtId TEXT,
          cityId TEXT,
          streetId TEXT,
          building TEXT,
          corpus TEXT,
          apartment TEXT,
          latitude REAL,
          longitude REAL,
          comment TEXT,
          addressText TEXT
        );
      `);
};

export const scheduleTableCreating = async (db:SQLite.SQLiteDatabase) => {
  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Schedule (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          "from" TEXT,
          "to" TEXT,
          breakFrom TEXT,
          breakTo TEXT,
          allDay INTEGER CHECK(allDay IN (0, 1)),
          weekDay INTEGER CHECK(weekDay BETWEEN 1 AND 7)
        );
      `);
};

export const contactTableCreating = async (db:SQLite.SQLiteDatabase) => {
  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Contact (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          storeId INTEGER,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          FOREIGN KEY (storeId) REFERENCES Store(id) ON DELETE CASCADE
        );
      `);
};

export const visitScheduleTableCreating = async (db:SQLite.SQLiteDatabase) => {
  await db.execAsync(`
                CREATE TABLE IF NOT EXISTS VisitSchedule (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  storeId INTEGER,
                  client1cId TEXT NOT NULL,
                  store1cId TEXT NOT NULL,
                  monday INTEGER CHECK(monday IN (0, 1)) DEFAULT 0,
                  tuesday INTEGER CHECK(tuesday IN (0, 1)) DEFAULT 0,
                  wednesday INTEGER CHECK(wednesday IN (0, 1)) DEFAULT 0,
                  thursday INTEGER CHECK(thursday IN (0, 1)) DEFAULT 0,
                  friday INTEGER CHECK(friday IN (0, 1)) DEFAULT 0,
                  saturday INTEGER CHECK(saturday IN (0, 1)) DEFAULT 0,
                  sunday INTEGER CHECK(sunday IN (0, 1)) DEFAULT 0,
                  FOREIGN KEY (storeId) REFERENCES Store(id) ON DELETE CASCADE
                );
              `);
};
