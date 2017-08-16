import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { EstatisticasProvider } from '../../providers/estatisticas/estatisticas';



@Component({
    selector: 'page-estatisticas',
    templateUrl: 'estatisticas.html',
})
export class EstatisticasPage {

    @ViewChild('barCanvas') barCanvas;
    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('barCanvas2') barCanvas2;


    barChart: any;
    estatistica: any;
    doughnutChart: any;
    loader: any;


    constructor(public navCtrl: NavController, public navParams: NavParams, public estatisticasServico: EstatisticasProvider, public loadingCtrl: LoadingController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EstatisticasPage');
        this.presentLoading();
        this.estatisticasServico.carregarEstatisticas()
            .subscribe(
            data => {
                console.log(JSON.stringify(data.distribuicao_tipo));
                console.log(JSON.stringify('BAIRROS ' + data.distribuicao_bairro));
                this.estatistica = data;

                this.estatistica.distribuicao_tipo = this.estatistica.distribuicao_tipo.sort(function (a, b) {
                    return parseFloat(a.quantidade) - parseFloat(b.quantidade);
                });

                this.estatistica.distribuicao_bairro = this.estatistica.distribuicao_bairro.sort(function (a, b) {
                    return parseFloat(b.quantidade) - parseFloat(a.quantidade);
                });

                console.log(JSON.stringify(this.estatistica.distribuicao_tipo));
                console.log(JSON.stringify('BAIRROS ' + this.estatistica.distribuicao_bairro));
                this.barChart = new Chart(this.barCanvas.nativeElement, {

                    type: 'bar',
                    data: {
                        labels: ["2013", "2014", "2015", "2016", "2017"],
                        datasets: [{
                            label: '# de registros',
                            data: [this.estatistica.distribuicao_ano[6].quantidade, this.estatistica.distribuicao_ano[3].quantidade, this.estatistica.distribuicao_ano[2].quantidade, this.estatistica.distribuicao_ano[1].quantidade, this.estatistica.distribuicao_ano[0].quantidade],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }

                });

                this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

                    type: 'doughnut',
                    data: {
                        labels: [this.estatistica.distribuicao_tipo[4].tipo, this.estatistica.distribuicao_tipo[5].tipo, this.estatistica.distribuicao_tipo[6].tipo, this.estatistica.distribuicao_tipo[7].tipo, this.estatistica.distribuicao_tipo[8].tipo],
                        datasets: [{
                            label: '# of Votes',
                            data: [this.estatistica.distribuicao_tipo[4].quantidade, this.estatistica.distribuicao_tipo[5].quantidade, this.estatistica.distribuicao_tipo[6].quantidade, this.estatistica.distribuicao_tipo[7].quantidade, this.estatistica.distribuicao_tipo[8].quantidade],
                            backgroundColor: [
                                'rgba(255, 99, 132, 1.0)',
                                'rgba(54, 162, 235, 1.0)',
                                'rgba(255, 206, 86, 1.0)',
                                'rgba(75, 192, 192, 1.0)',
                                '#222'
                            ],
                        }]
                    }

                });

                this.barChart = new Chart(this.barCanvas2.nativeElement, {

                    type: 'horizontalBar',
                    data: {
                        labels: [this.estatistica.distribuicao_bairro[0].bairro, this.estatistica.distribuicao_bairro[1].bairro, this.estatistica.distribuicao_bairro[2].bairro, this.estatistica.distribuicao_bairro[3].bairro, this.estatistica.distribuicao_bairro[4].bairro],
                        datasets: [{
                            label: '# de registros',
                            data: [this.estatistica.distribuicao_bairro[0].quantidade, this.estatistica.distribuicao_bairro[1].quantidade, this.estatistica.distribuicao_bairro[2].quantidade, this.estatistica.distribuicao_bairro[3].quantidade, this.estatistica.distribuicao_bairro[4].quantidade],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.5)',
                                'rgba(54, 162, 235, 0.5)',
                                'rgba(255, 206, 86, 0.5)',
                                'rgba(153, 102, 255, 0.5)',
                                'rgba(255, 159, 64, 0.5)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }

                });
                this.loader.dismiss();
            },
            err => {
                console.log('[ERROR] ' + err);
                this.loader.dismiss();

            },
            () => console.log("estatisticas carregadas")
            );
    }

    presentLoading() {

        this.loader = this.loadingCtrl.create({
            content: "Carregando estatísticas..."
        });

        this.loader.present();

    }

}
