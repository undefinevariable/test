describe('helloWorld',function(){
	it('Should equal hello world',function(){		
		expect(helloWorld()).toEqual("Hello World");
	})
	it('Should contain hello ',function(){		
		expect(helloWorld()).toContain("Hello");
	})
	it('To be Hello world',function(){		
		expect(helloWorld()).toBe("Hello World");
	})
	
	it('No to be Hello',function(){		
		expect(helloWorld()).not.toBe("Hello");
	})

});