package au.org.housing.listener;

import java.io.IOException;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;

import au.org.housing.utilities.TemporaryFileManager;

/**
 * Responsible for session creation and destroy.
 * Need to be changed. 
 *
 * @author Amir.Nasr, Gh.Karami
 * @version 1.0
 *
 */  

public class FileManagementListener implements HttpSessionListener{
	
	private static int totalActiveSessions = 0;

	public static int getTotalActiveSession(){
		return totalActiveSessions;
	}

	@Override
	public void sessionCreated(HttpSessionEvent se) {
		
		System.out.println("sessionCreated");
		totalActiveSessions++;
		printCounter(se);		
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent se) {
//		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//		String username = auth.getName(); //get logged in username
		
		System.out.println("sessionDestroyed - deduct one session from counter");	
		totalActiveSessions--;
		printCounter(se);
		try {
	
			TemporaryFileManager.deleteDownloadDir(se.getSession());   

		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	private void printCounter(HttpSessionEvent sessionEvent){		
		System.out.println(totalActiveSessions);
		System.out.println(sessionEvent.getSession().getId());	

	}

}
