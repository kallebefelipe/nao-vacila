package analise;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Scanner;

public class ConverterData {
	public void executar(String TXT){
		
		try {
			FileReader entrada = new FileReader(TXT);
			BufferedReader lerEntrada = new BufferedReader(entrada);
			String linha;
			Scanner ler = new Scanner(System.in);
			linha = lerEntrada.readLine();
			int idDoc = 2001;
			FileWriter saidaS = new FileWriter("Re8.txt");
			PrintWriter escreverSaidaS = new PrintWriter(saidaS);
			while(linha != null){
				int j = 0;
				String texto = "";
				String tag = "";
				while(j < linha.length()) {
					if(linha.charAt(j) == '"' && linha.charAt(j + 1) == 't' && linha.charAt(j + 2)=='a' && linha.charAt(j + 3) == 'g' && linha.charAt(j + 4)=='"') {
						while(linha.charAt(j) != '"' || linha.charAt(j + 1) != ',' || linha.charAt(j + 2) !=' ' || linha.charAt(j + 3) != '"') {
							tag = tag + linha.charAt(j);
							j++;
						}
					}	
					if(linha.charAt(j) == '"' && linha.charAt(j + 1) == 't' && linha.charAt(j + 2)=='e' && linha.charAt(j + 3) == 'x' && linha.charAt(j + 4)=='t' && linha.charAt(j + 5) == 'o' && linha.charAt(j + 6)=='"') {
						j = j + 10;
						while(linha.charAt(j) != '"' || linha.charAt(j + 1) != ',' || linha.charAt(j + 2) !=' ' || linha.charAt(j + 3) != '"') {
							if(linha.charAt(j) == '\\' && linha.charAt(j + 1) == '\\' && linha.charAt(j + 2) =='r' && linha.charAt(j + 3) == '\\' && linha.charAt(j + 4) =='\\' && linha.charAt(j + 5) == 'n') {
								j = j + 6;
							}
							else if(linha.charAt(j) == '\\' && linha.charAt(j + 1) == '\\' && linha.charAt(j + 2) =='t') {
								j = j + 3;
							}
							else if(linha.charAt(j) == '\\' && linha.charAt(j + 1) == '\\' && linha.charAt(j + 2) =='n') {
								j = j + 3;
							}
							else if(linha.charAt(j) == '\\' && linha.charAt(j + 1) == '\\' && linha.charAt(j + 2) =='\'') {
								texto = texto + '\'';
								j = j + 3;
							}
							else if(linha.charAt(j) == '\\' && linha.charAt(j + 1) == '"') {
								texto = texto + '"';
								j = j + 2;
							}
							else if(linha.charAt(j) == ' ' && linha.charAt(j + 1) == ' ') {
								while(linha.charAt(j) == ' ') {
									j++;
								}
								texto = texto + ' ';
							}
							else if((linha.charAt(j) == '.' || linha.charAt(j) == '!' || linha.charAt(j) == '?' || linha.charAt(j) == ':')&& linha.charAt(j+1) == ' ') {
								texto = texto + linha.charAt(j);
								texto = texto + '\n';
								j++;
							}
							else {
								texto = texto + linha.charAt(j);
								j++;
							}
						}
						System.out.println(texto);
						System.out.print(idDoc + "-");
						System.out.print(tag);
						int i;
						System.out.println("\n1-homicidio");
						System.out.println("2-assalto");
						System.out.println("3-furto");
						System.out.println("4-trafico");
						System.out.println("5-Agressao");
						System.out.println("6-arrombamento");
						System.out.println("7-tiroteio");
						System.out.println("8-sem classe");
						System.out.println("9-sequestro");
						System.out.println("10-estupro");
						System.out.println("11-porte_ilegal");
						System.out.println("12-acidente");
						System.out.println("13-ambiental");
						System.out.println("14-fuga");
						System.out.println("15-golpe");
						System.out.println("16-pedofilia");
						System.out.println("17-inserir");
						i = ler.nextInt();
						FileWriter saida;
						if(i == 1) {
							saida = new FileWriter("Re8/homicidio." + idDoc + ".txt");
						}else if( i == 2) {
							saida = new FileWriter("Re8/assalto." + idDoc + ".txt");
						}else if( i == 3) {
							saida = new FileWriter("Re8/furto." + idDoc + ".txt");
						}else if( i == 4) {
							saida = new FileWriter("Re8/trafico." + idDoc + ".txt");
						}else if( i == 5) {
							saida = new FileWriter("Re8/agressao." + idDoc + ".txt");
						}else if( i == 6) {
							saida = new FileWriter("Re8/arrombamento." + idDoc + ".txt");
						}else if( i == 7) {
							saida = new FileWriter("Re8/tiroteio." + idDoc + ".txt");
						}else if( i == 8) {
							saida = new FileWriter("Re8/sem_classe." + idDoc + ".txt");
						}else if( i == 9) {
							saida = new FileWriter("Re8/sequestro." + idDoc + ".txt");
						}else if( i == 10) {
							saida = new FileWriter("Re8/estupro." + idDoc + ".txt");
						}else if( i == 11) {
							saida = new FileWriter("Re8/porte_ilegal." + idDoc + ".txt");
						}else if( i == 12) {
							saida = new FileWriter("Re8/acidente." + idDoc + ".txt");
						}else if( i == 13) {
							saida = new FileWriter("Re8/ambiental." + idDoc + ".txt");
						}else if( i == 14) {
							saida = new FileWriter("Re8/fuga." + idDoc + ".txt");
						}else if( i == 15) {
							saida = new FileWriter("Re8/golpe." + idDoc + ".txt");
						}else if( i == 16) {
							saida = new FileWriter("Re8/pedofilia." + idDoc + ".txt");
						}else{
							System.out.println("inserir");
							String tipo = ler.next();
							saida = new FileWriter("Re8/" + tipo + "." + idDoc + ".txt");
						}
						
						PrintWriter escreverSaida = new PrintWriter(saida);
						escreverSaida.append(texto);
						if((texto.indexOf("recife") != -1)) {
							texto = texto.substring(0,texto.indexOf("recife")) + "<START:cidadeCrime> "
									+  texto.substring(texto.indexOf("recife"), texto.indexOf("recife")+6) + " <END>" 
									+ texto.substring(texto.indexOf("recife") + 6,texto.length())+ '\n' + '\n';
							escreverSaidaS.print(texto);
							escreverSaidaS.flush();
						}
						escreverSaida.close();
						idDoc++;
					}else {
						j++;
					}
				}
				linha = lerEntrada.readLine();
			}
			
			ler.close();
			saidaS.close();
			entrada.close();
			
			FormatSequence format = new FormatSequence();
			format.executar("Re8.txt");
			
			System.out.println("ConverterData");
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
		
		
	}
}
