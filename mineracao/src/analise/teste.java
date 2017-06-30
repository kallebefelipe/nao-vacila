package analise;

public class teste {
	public static void main(String[] args){
		GerarARFF arff = new GerarARFF();
		arff.gerar("textos_base.txt");		
		System.out.println("Arquivo concluído");
	}
}
