/*********************************************************************
Guigur 2016
*********************************************************************/

#include <SPI.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_HMC5883_U.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <NewPing.h>

#define OLED_RESET 4
Adafruit_SSD1306 display(OLED_RESET);

#define NUMFLAKES 10
#define XPOS 0
#define YPOS 1
#define DELTAY 2

#if (SSD1306_LCDHEIGHT != 64)
#error("Height incorrect, please fix Adafruit_SSD1306.h!");
#endif

Adafruit_HMC5883_Unified mag = Adafruit_HMC5883_Unified(12345);
NewPing sonar(12, 11, 500); // trigger, echo, max

void displaySensorDetails(void)
{
  sensor_t sensor;
  mag.getSensor(&sensor);
  Serial.println("------------------------------------");
  Serial.print  ("Sensor:       "); Serial.println(sensor.name);
  Serial.print  ("Driver Ver:   "); Serial.println(sensor.version);
  Serial.print  ("Unique ID:    "); Serial.println(sensor.sensor_id);
  Serial.print  ("Max Value:    "); Serial.print(sensor.max_value); Serial.println(" uT");
  Serial.print  ("Min Value:    "); Serial.print(sensor.min_value); Serial.println(" uT");
  Serial.print  ("Resolution:   "); Serial.print(sensor.resolution); Serial.println(" uT");  
  Serial.println("------------------------------------");
  Serial.println("");
  delay(500);
}

void setup()
{                
  Serial.begin(115200);
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);  //addr on the i2c bus
  if(!mag.begin())
  {
    Serial.println("Ooops, no HMC5883 detected ... Check your wiring!");
    while(1);
  }
}

void loop()
{
  display.clearDisplay();
  display.setCursor(0,0);

  Serial.print("Distance: ");
  Serial.print(sonar.ping_cm());
  Serial.println("cm");
  
  display.setTextSize(2);
  display.setTextColor(WHITE);
  display.println("Distance");
  display.print(sonar.ping_cm(), DEC);
  display.println(" cm");
  display.display();
  delay(50);
}
