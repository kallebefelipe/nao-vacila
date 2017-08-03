package analise;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class FormatSequence {
	public void executar(String TXT){
		try {
			FileReader entrada = new FileReader(TXT);
			BufferedReader lerEntrada = new BufferedReader(entrada);
			String linha = lerEntrada.readLine();
			FileWriter saida = new FileWriter("sequencias.txt");
			PrintWriter escreverSaida = new PrintWriter(saida);
			int i;
			char c;
			while(linha != null){
				i = 0;
				while(i < linha.length()){
					c = linha.charAt(i);
					if(c == '.' || c == '!' || c == '?'){
						escreverSaida.append(c);
						escreverSaida.append('\n');
					}
					else if(c == '\n')
						escreverSaida.append(' ');
					else
						escreverSaida.append(c);
					i++;
				}
				linha = lerEntrada.readLine();
				if(linha != null)
					escreverSaida.append("\n");
			}
			saida.close();
			entrada.close();
			System.out.println("Concluido");
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}
}
