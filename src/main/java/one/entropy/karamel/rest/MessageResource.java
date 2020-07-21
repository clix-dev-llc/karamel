package one.entropy.karamel.rest;

import io.quarkus.runtime.StartupEvent;
import io.smallrye.mutiny.Multi;
import io.vertx.core.json.JsonObject;
import io.vertx.mutiny.core.Vertx;
import io.vertx.mutiny.core.eventbus.EventBus;
import one.entropy.karamel.data.JsonUtil;
import one.entropy.karamel.data.KEventOut;
import one.entropy.karamel.data.SessionBrokers;
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.event.Observes;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import static one.entropy.karamel.service.CamelService.BROKERS_ADDRESS;
import static one.entropy.karamel.service.CamelService.MESSAGE_ADDRESS;

@Path("/api")
public class MessageResource {

    private static final Logger LOGGER = LoggerFactory.getLogger(MessageResource.class.getCanonicalName());

    @Inject
    EventBus eventBus;

    @Inject
    Vertx vertx;

    @GET
    @Produces(MediaType.SERVER_SENT_EVENTS)
    @Path("message/{sessionId}")
    public Multi<JsonObject> eventSourcing(@PathParam("sessionId") String sessionId) {
        LOGGER.info("Start sourcing for session{}", sessionId);
        return eventBus.<JsonObject>consumer(sessionId).toMulti().map(event -> event.body());
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("message")
    public Response produce(@MultipartForm String json) {
        LOGGER.info("Publishing: {}", json);
        KEventOut kevent = JsonUtil.fromJson(json, KEventOut.class);
        eventBus.publish(MESSAGE_ADDRESS, kevent);
        return Response.ok().build(); // TODO: check result before response
    }
}
