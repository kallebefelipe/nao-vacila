package informacao;

import java.io.FileInputStream;
import java.io.InputStream;
import opennlp.tools.namefind.NameFinderME;
import opennlp.tools.namefind.TokenNameFinderModel;
import opennlp.tools.tokenize.SimpleTokenizer;
import opennlp.tools.util.Span;

public class ExtrairCidadeCrime {
	public String executar(String texto) throws Exception {
		SimpleTokenizer tokenizer = SimpleTokenizer.INSTANCE; 
		String tokens[] = tokenizer.tokenize(texto);
		
		InputStream modeloE = new FileInputStream("pt-ner-cidadeCrime.bin");
		TokenNameFinderModel model = new TokenNameFinderModel(modeloE);
		NameFinderME nf =new NameFinderME(model);
		Span spans[] = nf.find(tokens);
		String cidades[] = Span.spansToStrings(spans, tokens);
		
		if(cidades.length > 0) {
			return cidades[0];
		}
		else {
			return "";
		}
	}
}
