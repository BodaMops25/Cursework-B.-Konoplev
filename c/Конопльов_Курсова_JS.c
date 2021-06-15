#include <stdio.h>
#include <string.h>
#include <math.h>

#define cnvsSizeY 160 // == X
#define cnvsSizeX 40  // == Y

int main() {
   
   char inputLine1[80],  //сначала n, потом h, 2 ⩽ h ⩽ n ⩽ 500 000, n количество секторов острова, h количество хиж
   inputLine2[80];  //в порядку возростания указаны номера секторов, на которых будут хижины
   
   FILE *inputStr;
   
   inputStr = fopen("input.txt", "r");
   
   fgets(inputLine1, 80, inputStr);
   fgets(inputLine2, 80, inputStr);
   
   fclose(inputStr);
   
   int sectors = 0, //количество секторов в курсовой именуется как "n"
   huts = 0, //количество хижин в курсовой именуется как "h"
   numbersHuts[255] = {}; //номера секторов на которых находятся хижины
   
   int swicher = 0, j = 0;
   char helper[80];
   
   //в этом цикле инпут строка, то есть масив, переводится в числовые значения переменных, масив helper[] сначала собирает из
   //фрагмента инпут лайна число, а когда цикл доходит до пробела в инпут лайне, то atoi(helper) - уже полноценное значение
   //присваивается переменной
   
   for(int i = 0; i <= strlen(inputLine1); i++) {
      
      if(inputLine1[i] == ' ' || inputLine1[i] == '\0') {
         
         if(swicher == 0)  sectors = atoi(helper);
         else if(swicher == 1) huts = atoi(helper);
         
         for(int b = 0; b < strlen(helper); b++) {
            helper[b] = ' ';
         }
         
         j = 0;
         
         swicher++;
      }
      
      if(inputLine1[i] != ' ') {
         helper[j] = inputLine1[i];
         j++;
      }
   }
   
   //проверки что 2 ⩽ h ⩽ n ⩽ 500 000
   
   if(sectors > 500000) printf("Количество секторов больше 500 000!\n");
   
   else if(sectors < 2) printf("Количество секторов меньше 2!\n");
   
   else if(huts > sectors) printf("Количество хижин больше чем количество секторов!\n");
   
   else if(huts < 2) printf("Количество хижин меньше 2!\n");
   
   else {
      
      swicher = 0,
      j = 0;
      
      for(int b = 0; b < strlen(helper); b++) {
         helper[b] = '0';
      }
      
      printf("Количество секторов: %d, количество хижин: %d\n\n", sectors, huts);
      
      //тот же самый цикл что и кодом выше, но здесь выходные значения выводятся в масив numbersHuts[] в строке (*)
      
      for(int i = 0; i <= strlen(inputLine2); i++) {
         
         if(inputLine2[i] == ' ' || inputLine2[i] == '\0') {
            
            numbersHuts[swicher] = atoi(helper); //строка (*)
            
            for(int b = 0; b < strlen(helper); b++) {
               helper[b] = ' ';
            }
            
            j = 0;
            
            swicher++;
         }
         
         if(inputLine2[i] != ' ') {
            helper[j] = inputLine2[i];
            j++;
         }
      }
      
      int numbersHutsNumElements = 0, errorHutsNumElements = 0;
      
      printf("Номера секторов в которых находятся хижины: ");
      
      for(int i = 0; numbersHuts[i] != 0; i++) {
         
         printf("%d", numbersHuts[i]);
         
         if(numbersHuts[i] < 1) {
            printf("(номер ниже 1!)");
            errorHutsNumElements = 1;
         }
         else if(numbersHuts[i] > sectors) {
            printf("(номер выше количества секторов!)");
            errorHutsNumElements = 1;
         }
         if(numbersHuts[i] < numbersHuts[i - 1] && i > 0) {
            printf("(номер ниже предедущего номера!)");
            errorHutsNumElements = 1;
         }
         
         if(numbersHuts[i + 1] != 0) printf(",");
         
         numbersHutsNumElements++;
      }
      
      if(errorHutsNumElements == 1) printf(" --- Внимание строка номеров секторов с хижинами содержит ошибки, программа будет работать не коректно!");
      
      if(numbersHutsNumElements != huts) printf("\n\nКоличество хижин и количество номеров секторов в которых стоят хижины(одна хижина в одном сектор) не равны!\nКоличество хижин: %d, количество номеров секторов в которых стоят хижины: %d\nПрограмма из за этого может работать не коректно!", huts, numbersHutsNumElements);
      
      for(int i = 0; i < numbersHutsNumElements; i++) {
         
      }
      
      //собственно сама програма
      //перебор дистанций между номерами хижин и выбор дистанции равной или максимально близкой к sectors/2
      
      int maxDistanse = 0;
      
      for(int i = numbersHutsNumElements - 1; i > 0; i--) {
         for(int k = i - 1; k >= 0; k--) {
            if(numbersHuts[i] - numbersHuts[k] == sectors/2) {
               maxDistanse = numbersHuts[i] - numbersHuts[k];
            }
            
            else if(numbersHuts[i] - numbersHuts[k] >= maxDistanse && numbersHuts[i] - numbersHuts[k] <= sectors/2) {
               maxDistanse = numbersHuts[i] - numbersHuts[k];
            }
            
            else if(sectors - numbersHuts[i] + numbersHuts[k] >= maxDistanse && sectors - numbersHuts[i] + numbersHuts[k] <= sectors/2) {
               maxDistanse = sectors - numbersHuts[i] + numbersHuts[k];
            }
         }
      }
      
      printf("\n\nВремя передвижения между самыми далекими хижинами острова равно %d(мин.)\n\n", maxDistanse);
      
      FILE *out;
      out = fopen("output.txt", "w");
      
      fprintf(out, "%d", maxDistanse);
      
      fclose(out);
   }
   
   // GRAPHICS
   
   char cnvs[cnvsSizeX][cnvsSizeY] = {};
   
   // SHOW CANVAS
   
   void render() {
      for(int i = 0; i < cnvsSizeX; i++) {
         for(int j = 0; j < cnvsSizeY; j++) {
            
            printf("%c", cnvs[i][j]);
         }
         printf("\n");
      }
   }
   
   // FILL CANVAS
   
   void drawCnvs(char symbol) {
      for(int i = 0; i < cnvsSizeX; i++) {
         for(int j = 0; j < cnvsSizeY; j++) {
            
            cnvs[i][j] = symbol;
         }
      }
   }
   
   void drawCircle(int x, int y, int radius, char symbol) {
      for(int i = 0; i < cnvsSizeX; i++) {
         for(int j = 0; j < cnvsSizeY; j++) {
            
            if(pow(i - y, 2) * 4 + pow(j - x, 2) < pow(radius, 2)) cnvs[i][j] = symbol;
         }
      }
   }
   
   void drawLine(int startX, int startY, int angle, int distance, char symbol) {
      
      int x = 0, y = 0;
      
      for(int i = 0; i < distance * 2; i++) {
         x = cos(angle * M_PI / 180) * i / 2 * 2 + startX;
         y = sin(angle * M_PI / 180) * i / 2 + startY;
         
         cnvs[y][x] = symbol;
      }
   }
   
   void drawLine_lastSymbol(int startX, int startY, int angle, int distance, int outArr[2]) {
      
      int x = 0, y = 0;
      
      x = cos(angle * M_PI / 180) * distance * 2 + startX;
      y = sin(angle * M_PI / 180) * distance + startY;
      
      outArr[0] = y;
      outArr[1] = x;
   }
   
   int angle = 0, sectorNumber = 1, coordsArr[2], numbersHutsI = 0;
   
   drawCnvs('0');
   drawCircle(cnvsSizeY / 2, cnvsSizeX / 2, 35, '.');
   
   for(int i = 0; i < sectors; i++) {
      drawLine(cnvsSizeY / 2, cnvsSizeX / 2, angle, 18, '/');
      drawLine_lastSymbol(cnvsSizeY / 2, cnvsSizeX / 2, angle + 360 / 2 / sectors, 15, coordsArr);
      cnvs[coordsArr[0]][coordsArr[1]] = sectorNumber++ + '0';
      
      drawLine_lastSymbol(cnvsSizeY / 2, cnvsSizeX / 2, angle + 360 / 4 / sectors, 15, coordsArr);
      
      if(numbersHuts[numbersHutsI] == i + 1) {
         drawCircle(coordsArr[1], coordsArr[0], 3, '@');
         numbersHutsI++;
      }
      
      angle += 360 / sectors;
   }
   
   drawCircle(cnvsSizeY / 2, cnvsSizeX / 2, 25, '9');
   
   render();
}
