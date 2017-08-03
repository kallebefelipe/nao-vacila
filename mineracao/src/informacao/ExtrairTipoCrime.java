package informacao;
import analise.NaiveBayes;

public class ExtrairTipoCrime {
	public String executar(String texto) {
		String tipoCrime;
		NaiveBayes naive = new NaiveBayes(texto);
		tipoCrime = naive.executar();
		
		if(tipoCrime.equals("sem_classe")) {
			return "";
		}
		return tipoCrime;
		
	}
}
