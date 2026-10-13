import { Module } from "@nestjs/common";
import { ApplicationsModule } from "./applications/applications.module";
import { AuthModule } from "./auth/auth.module";
import { CareersModule } from "./careers/careers.module";
import { CommonModule } from "./common/common.module";
import { ConfigModule } from "./config/config.module";
import { ContactModule } from "./contact/contact.module";
import { DatabaseModule } from "./database/database.module";
import { EmployeePortalModule } from "./employee-portal/employee-portal.module";
import { FilesModule } from "./files/files.module";
import { NewsModule } from "./news/news.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { ProjectsModule } from "./projects/projects.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    CommonModule,
    ConfigModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    ProjectsModule,
    CareersModule,
    ApplicationsModule,
    NewsModule,
    ContactModule,
    EmployeePortalModule,
    FilesModule,
    NotificationsModule,
  ],
})
export class AppModule {}
