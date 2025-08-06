#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <windows.h>

// Gera a mensagem com a chave para o cliente
void gerarMensagemCliente(char *hexPassado, char *ultimos2, char *hexFuturo, int mes, int anoAtual, char *plano, int duracaoDias) {
    printf("=============================================\n");
    printf("          CÓDIGO DE ACESSO PREMIUM\n");
    printf("             MBS TECHNOLOGY\n");
    printf("=============================================\n\n");

    printf("Plano: %s\n", plano);
    printf("Duração: %d dias\n\n", duracaoDias);

    printf("📅 Mês: %02d/%d\n", mes, anoAtual);
    printf("🔐 Código de Acesso: MBS-%s-XX%s-%s\n\n", hexPassado, ultimos2, hexFuturo);

    printf("➡️  Insira este código no aplicativo para desbloquear o modo Premium.\n");
    printf("⚠️  Este código é válido apenas para o período do plano.\n");
    printf("Caso precise renovar ou tenha dúvidas, entre em contato com nosso suporte.\n\n");

    printf("Atenciosamente,\n");
    printf("Equipe MBS Technology\n");
    printf("📧 suporte@mbstechnology.com.br\n");
    printf("🌐 www.mbstechnology.com.br\n");

    printf("\n=============================================\n");
}

// Função para gerar a senha para cada plano
void gerarSenhaPlano(int mes, int anoAtual, char *plano) {
    int duracaoDias = 0;
    int multiplicadorBase = 0;

    if (strcmp(plano, "Mensal") == 0) {
        multiplicadorBase = mes * 2 + 1;    // offset 1 para Mensal
        duracaoDias = 30;
    } else if (strcmp(plano, "Semestral") == 0) {
        multiplicadorBase = mes * 12 + 2;   // offset 2 para Semestral
        duracaoDias = 180;
    } else if (strcmp(plano, "Anual") == 0) {
        multiplicadorBase = mes * 24 + 3;   // offset 3 para Anual
        duracaoDias = 365;
    } else {
        printf("Plano desconhecido!\n");
        return;
    }

    int anoPassado = anoAtual - 1;
    int anoFuturo = anoAtual + 1;

    // Aplica o multiplicador base no cálculo
    int valPassado = anoPassado * multiplicadorBase;
    int valAtual = anoAtual * multiplicadorBase;
    int valFuturo = anoFuturo * multiplicadorBase;

    char hexPassado[10], hexAtual[10], hexFuturo[10];

    sprintf(hexPassado, "%X", valPassado);
    sprintf(hexAtual, "%X", valAtual);
    sprintf(hexFuturo, "%X", valFuturo);

    // Extrai os dois últimos caracteres do código hexadecimal atual
    int len = 0;
    while(hexAtual[len] != '\0') len++;

    char ultimos2[3] = "00";
    if (len >= 2) {
        ultimos2[0] = hexAtual[len - 2];
        ultimos2[1] = hexAtual[len - 1];
        ultimos2[2] = '\0';
    } else if (len == 1) {
        ultimos2[0] = hexAtual[0];
        ultimos2[1] = '\0';
    }

    // Exibe a mensagem para o cliente
    gerarMensagemCliente(hexPassado, ultimos2, hexFuturo, mes, anoAtual, plano, duracaoDias);
}

int main() {
    SetConsoleOutputCP(CP_UTF8);
    time_t t = time(NULL);
    struct tm *tm_info = localtime(&t);

    int mes = tm_info->tm_mon + 1;
    int anoAtual = tm_info->tm_year + 1900;

    // Gerar para os 3 planos
    gerarSenhaPlano(mes, anoAtual, "Mensal");
    gerarSenhaPlano(mes, anoAtual, "Semestral");
    gerarSenhaPlano(mes, anoAtual, "Anual");

    return 0;
}
