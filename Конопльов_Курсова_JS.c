#include <stdio.h>
#include <string.h>

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

	if(sectors > 500000) {
		printf("Количество секторов больше 500 000!\n");
	}
	else if(sectors < 2) {
		printf("Количество секторов меньше 2!\n");
	}
	else if(huts > sectors) {
		printf("Количество хижин больше чем количество секторов!\n");
	}
	else if(huts < 2) {
		printf("Количество хижин меньше 2!\n");
	}
	else {

		swicher = 0, 
		j = 0;
		
		for(int b = 0; b < strlen(helper); b++) {
	 	    helper[b] = '0';
		}
		
		printf("%d;%d;%s\n", sectors, huts, helper);
		printf("---\n");
		
		//тот же самый цикл что и кодом выше, но здесь выходные значения выводятся в масив numbersHuts[] в строке (58)
		
		for(int i = 0; i <= strlen(inputLine2); i++) {

			if(inputLine2[i] == ' ' || inputLine2[i] == '\0') {
			    
			    numbersHuts[swicher] = atoi(helper); //строка (58)
			    
			    for(int b = 0; b < strlen(helper); b++) {
	 		    	helper[b] = 'a';
			    }
			    
				j = 0;

				swicher++;
			}

			if(inputLine2[i] != ' ') {
				helper[j] = inputLine2[i];
				j++;
			}
		}
		
		int numbersHutsNumElements = 0;
		
		for(int i = 0; i < sizeof(numbersHuts) / sizeof(numbersHuts[0]); i++) {
		    if(numbersHuts[i] != 0) {
		        printf("%d;", numbersHuts[i]);
		        numbersHutsNumElements++;
		    }
		}
		printf("\n---\n");
		
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

		printf("Время что бы передвигаться между самыми далекими хижинами острова равно %d(мин.)\n", maxDistanse);
		
		FILE *out;
		out = fopen("output.txt", "w");
		
		fprintf(out, "%d", maxDistanse);
		
		fclose(out);
	}
}