package informacao;

public class Teste {
	public static void main(String[] args) {
		ExtrairInformacaoCrawler exc = new ExtrairInformacaoCrawler();
		try {
			System.out.println(exc.executar("texto1"));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
