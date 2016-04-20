#include <SoftwareSerial.h>

void setup() {
  // Open serial communications and wait for port to open:
  Serial.begin(115200);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  Serial.println("Started");

  // set the data rate for the SoftwareSerial port
  Serial1.begin(115200);
  Serial1.write("AT\r\n");
  delay(1000);
  Serial1.write("AT+CWMODE=1\r\n");
  delay(3000);
  Serial1.write("AT+CWJAP=\"Nabilla\",\"jaimelepain\"\r\n");
  delay(8000);
  Serial1.write("AT+CIPMUX=1\r\n");
  delay(3000);
  Serial1.write("AT+CIPSTART=0,\"TCP\",\"192.168.0.100\",3000\r\n");
  delay(4000);

  String cmd;
  cmd = "GET / HTTP/1.1\r\nHost: ";
  cmd += "192.168.43.182";
  cmd += ":3000\r\n\r\n";
  char buff[50];
  
  int cmdsize = cmd.length();
  String putain = "AT+CIPSEND=0," + String(cmdsize) + "\r\n";
  Serial.println(cmd.length());
  Serial1.write("AT+CIPSEND=0,44\r\n");
  delay(3000);
  Serial1.write("GET / HTTP/1.1\r\nHost: 192.168.0.100:3000\r\n\r\n");
}

void loop() {
  if (Serial1.available()) {
    Serial.write(Serial1.read());
  }
  if (Serial.available()) {
    Serial1.write(Serial.read());
  }
}
