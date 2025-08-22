import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { AzureMonitorTraceExporter } from '@azure/monitor-opentelemetry-exporter';

export function startOpenTelemetry() {
  const useAzureMonitor = !!process.env.AZURE_MONITOR_CONNECTION_STRING;
  const useOtlp = !!process.env.OTEL_EXPORTER_OTLP_ENDPOINT;

  let traceExporter;

  if (useAzureMonitor) {
    traceExporter = new AzureMonitorTraceExporter({
      connectionString: process.env.AZURE_MONITOR_CONNECTION_STRING,
    });
    console.log('Using Azure Monitor Trace Exporter');
  } else if (useOtlp) {
    traceExporter = new OTLPTraceExporter();
    console.log('Using OTLP Trace Exporter');
  } else {
    traceExporter = undefined;
    console.log('No trace exporter configured. OpenTelemetry will run with no external trace export.');
  }

  const sdk = new NodeSDK({
    traceExporter,
    instrumentations: [getNodeAutoInstrumentations()],
    serviceName: process.env.OTEL_SERVICE_NAME || 'mz-create-frontend-template',
  });

  try {
    sdk.start();
    console.log('OpenTelemetry initialized');
  } catch (error) {
    console.error('Failed to initialize OpenTelemetry:', error);
  }
}