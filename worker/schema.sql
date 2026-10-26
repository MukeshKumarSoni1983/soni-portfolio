DROP TABLE IF EXISTS visits;
CREATE TABLE visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT, vid TEXT, ip TEXT,
  country TEXT, region TEXT, region_code TEXT, city TEXT, postal TEXT, metro TEXT, continent TEXT, eu TEXT,
  tz TEXT, lat TEXT, lon TEXT, asn TEXT, org TEXT, colo TEXT, proto TEXT, tls TEXT,
  ua TEXT, device TEXT, lang TEXT, langs TEXT, plat TEXT, screen TEXT, btz TEXT, ref TEXT, path TEXT);
CREATE INDEX idx_ts ON visits(ts);
CREATE INDEX idx_vid ON visits(vid);
